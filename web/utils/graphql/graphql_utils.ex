defmodule SamplePhoenixReactApp.GraphQlAst.Utils do
  require Logger

  def kind_clean([{:kind, _ = kind} | _ = optional] = item) do
    item
    |> Keyword.delete(:loc)
    |> Enum.map(
      fn {key, value} ->
        case key do
          :name -> { :name, to_string(value) }
          _ -> { key, value }
        end
      end)
  end
end
