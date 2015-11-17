defmodule SamplePhoenixReactApp.GraphQl.Debug do
  require Logger

  ## for debug
  def normalize_debug([{:kind, _ = kind} | _ = optional] = item) do
    item = item
    |> Keyword.delete(:loc)

    Enum.map(item,
      fn {key, value} ->
        case key do
          :name -> { :name, to_string(value) }
          _ -> { key, normalize_debug(value) }
        end
      end)
  end

  def normalize_debug([hd|tl]) do
    [normalize_debug(hd)| normalize_debug(tl)]
  end

  def normalize_debug(item) do
    item
  end
end