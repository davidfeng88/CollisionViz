@collisions.each do |col|
  json.set! col.id do
    json.partial! 'api/collisions/collision', collision: col
  end
end
