defmodule SamplePhoenixReactApp.GraphQlAst.Selections do
  require Logger

  @moduledoc '''
    compact SelectionSet and Field

    [kind: :Field, name: "name1"] => %{"name1" => nil }
    [kind: :Field, name: "name1", selectionSet: s] => %{"name1" => s }

    [kind: SelectionSet, selections: s] => %{...}
  '''
  def compact(graphql) do
  end

  defp compact2([{:kind, :Field} | _] = item) do

  end
end
