class Recipe < ApplicationRecord
  has_many :directions
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  def ingredients_attributes=(attributes)
    attributes.each do |recipe_ingredients_hash|
      i = Ingredient.find_or_create_by(name: recipe_ingredients_hash[:name])
      self.recipe_ingredients.build(ingredient: i, quantity_prep:
      recipe_ingredients_hash[:quantity_prep], place: recipe_ingredients_hash[:place])
    end
  end

  def directions_attributes=(attributes)
    attributes.each do |d_hash|
      self.directions.build(place: d_hash[:place], content: d_hash[:content])
    end
  end

end
