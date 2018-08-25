'use strict'

const Hash = use('Hash')
const Model = use('Model')
const Customer = use("App/Models/Customer");

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
    //despues de crear un usuario crea un registro de customer
    this.addHook('afterSave' , async (userInstance) => {
      let customer = new Customer();
      userInstance.customer().save(customer);
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  customer() {
    return this.hasOne('App/Models/Customer')
  }
}

module.exports = User
