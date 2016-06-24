class Api::BillsController < ApplicationController

	before_action :bill, except: :index
	
  def index
  	render json: Bill.all
  end

  def show
    render json: @bill
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
