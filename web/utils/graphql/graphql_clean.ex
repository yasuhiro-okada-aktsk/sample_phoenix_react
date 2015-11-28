defmodule SamplePhoenixReactApp.GraphQlAst.Clean do
  require Logger

  def clean([{:kind, _ = kind} | _ = optional] = item) do
    item = item
    |> Keyword.delete(:loc)

    Enum.map(item,
      fn {key, value} ->
        case key do
          :name -> { :name, to_string(value) }
          _ -> { key, clean(value) }
        end
      end)
  end

  def clean([hd|tl]) do
    [clean(hd)| clean(tl)]
  end

  def clean(item) do
    item
  end
end