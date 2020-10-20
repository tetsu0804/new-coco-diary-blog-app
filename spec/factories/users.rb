FactoryBot.define do
  factory :user do
    sequence(:last_name) { |n| "吉田#{n}"}
    sequence(:first_name) { |n| "哲朗#{n}"}
    sequence(:email) { |n| "#{n}test@test.com"}
    password "password"
    password_confirmation "password"
  end
end
