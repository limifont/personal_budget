class Api::BillsController < ApplicationController

	before_action :bill, except: [:index, :create]

  def index
  	render json: Bill.all
  end

  def show
    render json: @bill
  end

  def create 
  	@bill = Bill.create(bill_params)

  	if @bill
  		render json: @bill
  	else
  		render json: {errors: @bill.errors.full_messages}
  	end

  end

  def update
    if @bill.update(bill_params)
      render json: @bill.reload
    else
      render json: {errors: @bill.errors.full_messages}
    end
  end

  def destroy
    @bill.destroy
    render json: true
  end

  private

    def bill_params
      params.require(:bill).permit(:name, :amount, :category, :due_date)
    end
    
    def bill
      @bill = Bill.find_by(id: params[:id])
    end

end
