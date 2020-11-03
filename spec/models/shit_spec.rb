require 'rails_helper'

RSpec.describe Shit, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @blog = Blog.create(title: '今日もここちゃんはかわいい', content: 'ずっとりっこにくっつき回るからとても愛おしいです', user_id: @user.id)
    @shit = Shit.create(shit_time: Time.zone.parse('2020-11-1 12:00:00'), blog_id: @blog.id)
  end

  describe 'Shit作成' do
    it '作成成功' do
      expect(@shit).to be_valid
      expect(@shit.blog.title).to eq '今日もここちゃんはかわいい'
      expect(@shit.blog.content).to eq 'ずっとりっこにくっつき回るからとても愛おしいです'
      expect(@shit.shit_time).to eq '2000-01-01 12:00:00 +0900'
      expect(Shit.count).to eq 1
    end

    it '同じブログで追加する' do
      shit = Shit.create(shit_time: Time.zone.parse('2020-11-1 13:00:00'), blog_id: @blog.id)

      expect(shit.shit_time).to eq '2000-01-01 13:00:00.000000000 +0900'
      expect(shit.blog.title).to eq '今日もここちゃんはかわいい'
      expect(shit.blog.content).to eq 'ずっとりっこにくっつき回るからとても愛おしいです'
      expect(Shit.count).to eq 2
      expect(shit).to be_valid
    end

    context '失敗の例' do
      it '値がない場合' do
        @shit.shit_time = ''
        expect(@shit).to_not be_valid
      end

      it 'nilの場合'  do
        @shit.shit_time = nil
        expect(@shit).to_not be_valid
      end
    end

  end
end
