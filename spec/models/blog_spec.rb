require 'rails_helper'

RSpec.describe Blog, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @other_user = FactoryBot.create(:user)

    @blog = Blog.create(title: '今日のここちゃん', content: '今日もソファの上でブランケットに噛みつき怒られるここちゃんでした', user_id: @user.id, break_first: 40, dinner: 40)
    @blog2 = Blog.create(title: 'うんち4回', content: '朝2回うんちして、夜二回うんちしました', user_id: @other_user.id, break_first: 34, dinner: 34)
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

    context 'break_firstとdinnerは数値に変換さる' do
      it 'break_firstが文字列の中身が数字が整数に変換' do
        @blog.break_first = '30'
        expect(@blog.break_first).to eq 30
      end

      it 'break_firstが小数点が整数' do
        @blog.break_first = 33.9
        expect(@blog.break_first).to eq 33
      end

      it 'break_firstが文字列の文字は0' do
        @blog.break_first = 'ここちゃん'
        expect(@blog.break_first).to eq 0
      end

      it 'dinnerが文字列の中身が数字が整数に変換' do
        @blog.dinner = '30'
        expect(@blog.dinner).to eq 30
      end

      it 'dinnerが小数点が整数' do
        @blog.dinner = 33.3
        expect(@blog.dinner).to eq 33
      end

      it 'dinnerが文字列の文字は0' do
        @blog.dinner = 'ここすけ'
        expect(@blog.dinner).to eq 0
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

    context 'break_firstとdinnerが整数以外だと失敗' do

    end
  end
end
