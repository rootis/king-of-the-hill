'use strict';

export default class Utils {

    static isTwoArraysEqual(array1: string[], array2: string[]): boolean {
        if (!array1 || !array2) {
            return false;
        }

        if (array1.length != array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (array2.indexOf(array1[i]) == -1) {
                return false;
            }
        }

        return true;
    }

}
