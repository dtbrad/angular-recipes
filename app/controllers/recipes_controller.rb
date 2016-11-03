class RecipesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  
  def index
    @recipes = Recipe.all
    render json: @recipes
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.save
    render json: @recipe, status: 201
  end

  def update
    @recipe = Recipe.find(params[:id])
    @recipe.update(recipe_params)
    @recipe.save
    render json: @recipe, status: 201
  end

  def destroy
    Recipe.find(params[:id]).destroy
  end

  def recipe_params
    params.require(:recipe).permit(:title, ingredients_attributes:
    [:place, :name, :quantity_prep], directions_attributes: [:place, :content])
  end

end
