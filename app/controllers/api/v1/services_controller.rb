class Api::V1::ServicesController < ApplicationController
 include CurrentUserConcern
  
  def index
    
    render json: Service.where(user: @current_user)
  end

  def create
    service = Service.new(service_params)
    service.user = @current_user
    
    if service.save
      render json: service
    else
      render json: { status: 500 }
    end
  end

  private

  def service_params
    params.permit(:id, :user_id, :name, :price, :category, user: @current_user)
  end
end

