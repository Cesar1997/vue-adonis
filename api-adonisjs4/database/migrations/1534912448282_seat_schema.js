'use strict'

const Schema = use('Schema')

class SeatSchema extends Schema {
  up () {
    this.create('seats', (table) => {
      table.increments()
      table.integer("seat_row").comment("numero de fila por sala");
      table.integer("seat_number").comment("numero de asiento por sala y fila");
      table.enum("seat_state",["AVAILABLE","BOOKED"]).defaultTo("AVAILABLE");
      table.integer("booking_id").nullable().unsigned();
      table.foreign("booking_id").references("bookings.id");
    })
  }

  down () {
    this.drop('seats')
  }
}

module.exports = SeatSchema
