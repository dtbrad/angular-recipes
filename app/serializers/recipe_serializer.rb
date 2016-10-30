class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :directions
  has_many :recipe_ingredients
  has_many :directions
end
