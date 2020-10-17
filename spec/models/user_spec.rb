require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = User.create(last_name: '吉田', first_name: '哲朗', email: 'test@test.com', password: 'password', password_confirmation: 'password')
  end

  it '成功' do
    expect(@user).to be_valid
  end

  describe '失敗' do
    context '記入がない為失敗' do
      it 'last_nameが無い' do
        @user.last_name = ''
        expect(@user).to_not be_valid
      end

      it 'first_nameが無い' do
        @user.first_name = ''
        expect(@user).to_not be_valid
      end

      it 'emailが無い' do
        @user.email = ''
        expect(@user).to_not be_valid
      end

      it 'passwordが無い' do
        @user.password = ' '
        expect(@user).to_not be_valid
      end

      it 'password_confirmationが無い' do
        @user.password_confirmation = ' '
        expect(@user).to_not be_valid
      end
    end

    context '記入が長すぎる為失敗と一応の長さ確認の成功例も' do
      it 'last_nameが21文字の為' do
        @user.last_name = 'a' * 21
        expect(@user).to_not be_valid
      end

      it 'last_nameが20文字の為成功' do
        @user.last_name = 'a' * 20
        expect(@user).to be_valid
      end

      it 'first_nameが21文字の為' do
        @user.last_name = 'a' * 21
        expect(@user).to_not be_valid
      end

      it 'first_nameが20文字の為成功' do
        @user.first_name = 'a' * 20
        expect(@user).to be_valid
      end

      it 'emailが256文字の為' do
        @user.email = 'a' * 244 + '@example.com'
        expect(@user).to_not be_valid
      end

      it 'emailが255文字の為成功' do
        @user.email = 'a' * 243 + '@example.com'
        expect(@user).to be_valid
      end

      it 'passwordが5文字の為' do
        @user.password = 'a' * 5
        @user.password_confirmation = 'a' * 5
        expect(@user).to_not be_valid
      end

      it 'passwordが6文字の為成功' do
        @user.password = 'a' * 6
        @user.password_confirmation = 'a' * 6
        expect(@user).to be_valid
      end
    end

    it '同じemailが二つ以上の場合失敗' do
      other_user = User.create(last_name: '田中', first_name: '太郎', email: 'test@test.com', password: 'password', password_confirmation: 'password')

      expect(other_user).to_not be_valid
    end
  end
end
