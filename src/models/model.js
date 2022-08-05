export default class Model {
    constructor () {
        if (this.constructor === Model) {
            throw new Error('Can not construct abstract class.')
        }
    }

    /**
     * @param {Object} attributes
     */
    fill (attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            this[key] = value
        }
        return this
    }

    /**
     * @throws Error
     */
    transformResponse () {
        throw new Error('You have to implement the method transformResponse.')
    }

    /**
     * @return {Object|void}
     */
    toObject () {}

    /**
     * @param {Object} attributes
     * @return {Model}
     */
    static with (attributes) {
        const instance = new this.prototype.constructor()
        instance.fill(attributes)
        return instance
    }

    /**
     * @param {Object} attributes
     * @return {null|Model}
     */
    static withResponse (attributes) {
        if (!attributes) {
            return null
        }
        const instance = new this.prototype.constructor()
        instance.transformResponse(attributes)
        return instance
    }
}
