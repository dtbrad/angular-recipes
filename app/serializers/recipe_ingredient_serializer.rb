class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity_prep, :name, :place

  def name
    @object.ingredient.name
  end
end
