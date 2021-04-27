/// <reference path="./declarations.d.ts" />
import * as cheerio from 'cheerio';
import * as Yakuza from 'yakuza';
import * as fs from 'fs';
import * as path from 'path';

Yakuza.scraper('projects');
Yakuza.agent('projects', 'planner5d').plan(['getProjectsList']);

const HASH_REGEXP = /https:\/\/planner5d\.com\/storage\/thumbs\.600\/(.*)\.jpg/;

export type GeneratePojectProps = {
    name?: string;
    hash?: string;
};

const generateProjectData = (props: GeneratePojectProps) => {
    return {
        name: '',
        cdate: '',
        udate: '',
        s: '',
        hash: '',
        gstatus: '',
        cstatus: '',
        folder: '',
        udate_thumbnail: '',
        fuid: '',
        shared: '',
        readOnly: 1,
        isCurContest: true,
        ...props,
    };
};

Yakuza.task('projects', 'planner5d', 'getProjectsList').main(function (task: any, http: any) {
    console.log('getProjectsList');
    http.get('https://planner5d.com/gallery/floorplans', function (err: any, res: any, body: any) {
        if (err) {
            task.fail(err, 'Request returned an error');
            return;
        }

        let $ = cheerio.load(body);

        let projects: any = [];

        $('.card.ideas-card').each(function (index, card) {
            const $card = $(card);
            const image = $card.find('.card-image img');
            const hash = image.attr('src')?.match(HASH_REGEXP)?.[1];
            const name = image.attr('alt');

            projects.push(generateProjectData({ name, hash }));
        });

        task.success(projects);
    });
});

const job = Yakuza.job('projects', 'planner5d');
job.enqueue('getProjectsList');

job.run();

job.on('task:getProjectsList:success', function (response: any) {
    fs.writeFile(
        path.resolve(__dirname, './data/projects.json'),
        JSON.stringify({
            items: response.data,
        }),
        (err) => {
            if (err) {
                throw err;
            }

            console.log('File has been written');
        }
    );
});

job.on('job:getProjectsList:fail', function (response: any) {
    console.error(response);
});
