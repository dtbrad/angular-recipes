class Recipe < ApplicationRecord
  belongs_to :user
  has_many :directions, dependent: :destroy
  has_many :recipe_ingredients, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients
  validates :title, uniqueness: true

  def ingredients_attributes=(attributes)
    remove_deleted_join_objects(recipe_ingredients, attributes)
    attributes.each do |recipe_ingredients_hash|
      i = Ingredient.find_or_create_by(name: recipe_ingredients_hash[:name])
      recipe_ingredients.build(
        ingredient:     i,
        quantity_prep:  recipe_ingredients_hash[:quantity_prep],
        place:          recipe_ingredients_hash[:place]
      ) unless ingredients.include?(i)
    end
  end

  def directions_attributes=(attributes)
    remove_deleted_join_objects(directions, attributes)
    attributes.each do |d_hash|
      d = Direction.find_or_create_by(content: d_hash[:content])
      directions.build(
        place:    d_hash[:place],
        content:  d_hash[:content]
      ) unless directions.include?(d)
    end
  end

  def remove_deleted_join_objects(join_objects, attributes)
    join_objects.each do |j|
      j.destroy unless attributes.collect { |a| a['id'] }.include?(j.id)
    end
  end
end
