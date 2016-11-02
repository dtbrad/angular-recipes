class Recipe < ApplicationRecord
  has_many :directions, dependent: :destroy
  has_many :recipe_ingredients, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients
  validates :title, uniqueness: true

  def ingredients_attributes=(attributes)
    param_ingredients = attributes.collect{|a| a[:id] if a[:id]}
    recipe_ingredients.each {|ri| ri.destroy unless param_ingredients.include?(ri.id)}
    attributes.each do |recipe_ingredients_hash|
      i = Ingredient.find_or_create_by(name: recipe_ingredients_hash[:name])
      if !ingredients.include?(i)
        recipe_ingredients.build(
            ingredient:     i,
            quantity_prep:  recipe_ingredients_hash[:quantity_prep],
            place:          recipe_ingredients_hash[:place])
      end
    end
  end

  def directions_attributes=(attributes)
    param_directions = attributes.collect{|a| a[:id] if a[:id]}
    self.directions.each {|d| d.destroy unless param_directions.include?(d.id)}
    attributes.each do |d_hash|
      self.directions.build(
        place:    d_hash[:place],
        content:  d_hash[:content])
    end
  end

end
