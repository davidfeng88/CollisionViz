# == Schema Information
#
# Table name: collisions
#
#  id                            :integer          not null, primary key
#  time                          :datetime         not null
#  lat                           :float            not null
#  lng                           :float            not null
#  borough                       :string
#  zip                           :integer
#  on_street                     :string
#  cross_street                  :string
#  off_street                    :string
#  number_of_persons_injured     :integer
#  number_of_persons_killed      :integer
#  number_of_pedestrians_injured :integer
#  number_of_pedestrians_killed  :integer
#  number_of_cyclist_injured     :integer
#  number_of_cyclist_killed      :integer
#  number_of_motorist_injured    :integer
#  number_of_motorist_killed     :integer
#  contributing_factor_vehicle_1 :string
#  contributing_factor_vehicle_2 :string
#  contributing_factor_vehicle_3 :string
#  contributing_factor_vehicle_4 :string
#  contributing_factor_vehicle_5 :string
#  unique_key                    :integer
#  vehicle_type_code_1           :string
#  vehicle_type_code_2           :string
#  vehicle_type_code_3           :string
#  vehicle_type_code_4           :string
#  vehicle_type_code_5           :string
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#

class Collision < ActiveRecord::Base
  require 'csv'

  validates :time, :lat, :lng, presence: true

  def self.import(file)
    Collision.destroy_all
    d = Time.parse('2017-06-22')

    CSV.foreach(file.path, headers: true) do |row|

      collision = Collision.new
      collision.time = Time.parse(row['TIME'], d)
      collision.lat = row['LATITUDE']
      collision.lng = row['LONGITUDE']
      collision.zip = row['ZIP CODE']
      collision.borough = row['BOROUGH']
      if collision.borough
        collision.borough = collision.borough.strip.titleize
      end
      collision.on_street = row['ON STREET NAME']
      if collision.on_street
        collision.on_street = collision.on_street.strip.titleize
      end
      collision.cross_street = row['CROSS STREET NAME']
      if collision.cross_street
        collision.cross_street = collision.cross_street.strip.titleize
      end
      collision.off_street = row['OFF STREET NAME']
      if collision.off_street
        collision.off_street = collision.off_street.strip.titleize
      end
      collision.number_of_persons_injured = row['NUMBER OF PERSONS INJURED']
      collision.number_of_persons_killed = row['NUMBER OF PERSONS KILLED']
      collision.number_of_pedestrians_injured = row['NUMBER OF PEDESTRIANS INJURED']
      collision.number_of_pedestrians_killed = row['NUMBER OF PEDESTRIANS KILLED']
      collision.number_of_cyclist_injured = row['NUMBER OF CYCLIST INJURED']
      collision.number_of_cyclist_killed = row['NUMBER OF CYCLIST KILLED']
      collision.number_of_motorist_injured = row['NUMBER OF MOTORIST INJURED']
      collision.number_of_motorist_killed = row['NUMBER OF MOTORIST KILLED']
      collision.contributing_factor_vehicle_1 = row['CONTRIBUTING FACTOR VEHICLE 1']
      collision.contributing_factor_vehicle_2 = row['CONTRIBUTING FACTOR VEHICLE 2']
      collision.contributing_factor_vehicle_3 = row['CONTRIBUTING FACTOR VEHICLE 3']
      collision.contributing_factor_vehicle_4 = row['CONTRIBUTING FACTOR VEHICLE 4']
      collision.contributing_factor_vehicle_5 = row['CONTRIBUTING FACTOR VEHICLE 5']
      collision.unique_key = row['UNIQUE KEY']

      collision.vehicle_type_code_1 = row['VEHICLE TYPE CODE 1']
      if collision.vehicle_type_code_1
        collision.vehicle_type_code_1 = collision.vehicle_type_code_1.strip.titleize
      end
      collision.vehicle_type_code_2 = row['VEHICLE TYPE CODE 2']
      if collision.vehicle_type_code_2
        collision.vehicle_type_code_2 = collision.vehicle_type_code_2.strip.titleize
      end
      collision.vehicle_type_code_3 = row['VEHICLE TYPE CODE 3']
      if collision.vehicle_type_code_3
        collision.vehicle_type_code_3 = collision.vehicle_type_code_3.strip.titleize
      end
      collision.vehicle_type_code_4 = row['VEHICLE TYPE CODE 4']
      if collision.vehicle_type_code_4
        collision.vehicle_type_code_4 = collision.vehicle_type_code_4.strip.titleize
      end
      collision.vehicle_type_code_5 = row['VEHICLE TYPE CODE 5']
      if collision.vehicle_type_code_5
        collision.vehicle_type_code_5 = collision.vehicle_type_code_5.strip.titleize
      end

      collision.save
    end
  end

end
