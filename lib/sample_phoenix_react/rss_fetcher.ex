defmodule SamplePhoenixReactApp.RssFetcher do
  @moduledoc false

  require Logger

  def fetch(url) do
    Logger.error url

    case HTTPoison.get(url) do

      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, feed, _} = FeederEx.parse(body)
        feed
      {:ok, %HTTPoison.Response{status_code: status}} ->
        IO.puts "error status : " <> to_string(status)
        nil
      {:error, %HTTPoison.Error{reason: reason}} ->
        IO.inspect reason
        nil
    end
  end
end
