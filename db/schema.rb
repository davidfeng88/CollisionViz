# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170708190310) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collisions", force: :cascade do |t|
    t.datetime "time", null: false
    t.float "lat", null: false
    t.float "lng", null: false
    t.string "borough"
    t.integer "zip"
    t.string "on_street"
    t.string "cross_street"
    t.string "off_street"
    t.integer "number_of_persons_injured"
    t.integer "number_of_persons_killed"
    t.integer "number_of_pedestrians_injured"
    t.integer "number_of_pedestrians_killed"
    t.integer "number_of_cyclist_injured"
    t.integer "number_of_cyclist_killed"
    t.integer "number_of_motorist_injured"
    t.integer "number_of_motorist_killed"
    t.string "contributing_factor_vehicle_1"
    t.string "contributing_factor_vehicle_2"
    t.string "contributing_factor_vehicle_3"
    t.string "contributing_factor_vehicle_4"
    t.string "contributing_factor_vehicle_5"
    t.integer "unique_key"
    t.string "vehicle_type_code_1"
    t.string "vehicle_type_code_2"
    t.string "vehicle_type_code_3"
    t.string "vehicle_type_code_4"
    t.string "vehicle_type_code_5"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["time"], name: "index_collisions_on_time"
  end

end
