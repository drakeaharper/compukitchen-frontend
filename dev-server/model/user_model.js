import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import { StringUtil } from '../utilities/string-util'

const userSchema = new mongoose.Schema({
    username: String,
    first: String,
    last: String,
    password: String,
    role: { type: String, default: 'user' }
})
userSchema.set('timestamps', true)
userSchema.virtual('fullName').get(function() {
    const first = StringUtil.capitalize(this.first.toLowerCase())
    const last = StringUtil.capitalize(this.last.toLowerCase())
    return `${first} ${last}`
})
userSchema.statics.passwordMatches = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}
userSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase()
    this.first = this.first.toLowerCase()
    this.last = this.last.toLowerCase()
    const unsafePassword = this.password
    this.password = bcrypt.hashSync(unsafePassword)
    next()
})

export default mongoose.model('user', userSchema)