class ChangeColumnInDirections < ActiveRecord::Migration[5.0]
  def change
    rename_column :directions, :step, :place 
  end
end
