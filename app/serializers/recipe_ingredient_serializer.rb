class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity_prep, :name

  def name
    @object.ingredient.name
  end
end
