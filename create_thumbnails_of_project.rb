#!/usr/bin/env ruby
require 'mini_magick'

project = ARGV[0]
orig_images = []

(1..10).each do |n|
  filename = "images/#{project}/#{n}.png"
  if File.exist?(filename)
    orig_images << filename
  end
end

unless orig_images.empty?
  orig_images.each do |orig_image|
    thumb = MiniMagick::Image.open(orig_image)
    thumb.resize "640x360"
    thumb.format "jpg"
    thumb.write orig_image.gsub('.png', '_thumb.jpg')
  end
else
  abort "You forgot to add png files into #{project} or entered wrong project name"
end
