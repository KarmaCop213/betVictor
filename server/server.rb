require 'httparty'
require 'sinatra'

before do
  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
end

get '/data' do
  content_type :json
  url = 'https://www.betvictor.com/bv_in_play/v2/en-gb/1/mini_inplay.json'
  response = HTTParty.get(url)
  response.body
end
