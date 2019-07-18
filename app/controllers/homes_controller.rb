class HomesController < ApplicationController
  def home
    render json: { status: "It's alive" }
  end
end