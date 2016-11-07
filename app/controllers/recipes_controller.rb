class RecipesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_recipe, except: [:index, :create]

  def index
    @recipes = Recipe.all
    render json: @recipes
  end

  def show
    render json: @recipe
  end

  def create
    @recipe = current_user.recipes.build(recipe_params)
    @recipe.save
    render json: @recipe, status: 201
  end

  def update
    if @recipe.user == current_user
      @recipe.update(recipe_params)
      @recipe.save
    end
    render json: @recipe, status: 201
  end

  def destroy
    @recipe.destroy if @recipe.user == current_user
  end

  private

  def recipe_params
    params.require(:recipe).permit(
      :title,
      ingredients_attributes: [:id, :place, :name, :quantity_prep],
      directions_attributes: [:id, :place, :content]
    )
  end

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end
end
