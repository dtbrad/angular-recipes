class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :directions
  has_many :ingredients_attributes
  has_many :directions_attributes

  def ingredients_attributes
    object.recipe_ingredients
  end

  def directions_attributes
    object.directions
  end
end
