import { applyMixins } from './mixins';
import Api from "./Api";
import Dom from "./Dom";
import Observer from "./Observer";

describe('Mixins test', () => {
    it('Create mixin', () => {
        class Animal {
            run() {
                return 'run';
            }

            jump() {
                return 'jump';
            }
        }

        class Bird {
            fly() {
                return 'fly';
            }
        }

        class Fish {
            swim() {
                return 'swim';
            }
        }

        interface Animal extends Bird, Fish {}
        applyMixins(Animal, [Bird, Fish]);

        const animal = new Animal();

        expect(animal.run()).toEqual('run');
        expect(animal.jump()).toEqual('jump');
        expect(animal.fly()).toEqual('fly');
        expect(animal.swim()).toEqual('swim');
    });
});
