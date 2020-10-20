require 'rails_helper'

RSpec.describe Blog, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @other_user = FactoryBot.create(:user)

    @blog = Blog.create(title: '今日のここちゃん', content: '今日もソファの上でブランケットに噛みつき怒られるここちゃんでした', user_id: @user.id)
    @blog2 = Blog.create(title: 'うんち4回', content: '朝2回うんちして、夜二回うんちしました', user_id: @other_user.id)
  end

  context '成功' do
    it '通常' do
      expect(@blog).to be_valid
    end

    context '文字数' do
      it 'titleが20文字以内で成功' do
        @blog.title = 'a' * 20
        expect(@blog).to be_valid
      end

      it 'contentが300文字以内で成功' do
        @blog.content = 'a' * 300
        expect(@blog).to be_valid
      end
    end
  end

  context '失敗と一応成功例も' do
    context '文字数' do
      it 'titleが21文字以上で失敗' do
        @blog.title = 'a' * 21
        expect(@blog).to_not be_valid
      end

      it 'contentが301文字' do
        @blog.content = 'a' * 301
        expect(@blog).to_not be_valid
      end
    end

    context '文字が無ければ失敗' do
      it 'titleが無ければ失敗' do
        @blog.title = ''
        expect(@blog).to_not be_valid
      end

      it 'contentが無ければ失敗' do
        @blog.content = ''
        expect(@blog).to_not be_valid
      end
    end
  end
end
