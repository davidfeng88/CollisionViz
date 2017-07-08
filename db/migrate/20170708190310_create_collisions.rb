class CreateCollisions < ActiveRecord::Migration[5.1]
  def change
    create_table :collisions do |t|
      t.datetime :time, null: false
      t.float :lat, null: false
      t.float :lng, null: false

      t.string :borough
      t.integer :zip
      t.string :on_street
      t.string :cross_street
      t.string :off_street

      t.integer :number_of_persons_injured
      t.integer :number_of_persons_killed
      t.integer :number_of_pedestrians_injured
      t.integer :number_of_pedestrians_killed
      t.integer :number_of_cyclist_injured
      t.integer :number_of_cyclist_killed
      t.integer :number_of_motorist_injured
      t.integer :number_of_motorist_killed

      t.string :contributing_factor_vehicle_1
      t.string :contributing_factor_vehicle_2
      t.string :contributing_factor_vehicle_3
      t.string :contributing_factor_vehicle_4
      t.string :contributing_factor_vehicle_5

      t.integer :unique_key

      t.string :vehicle_type_code_1
      t.string :vehicle_type_code_2
      t.string :vehicle_type_code_3
      t.string :vehicle_type_code_4
      t.string :vehicle_type_code_5

      t.timestamps
    end

    add_index :collisions, :time
  end
end
