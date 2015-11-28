defmodule SamplePhoenixReactApp.GraphQlAst.DebugTest do
  use ExUnit.Case, async: true

  alias SamplePhoenixReactApp.GraphQlAst

  test "normalize_debug" do
    graphql = [
      [kind: :Field, loc: [], name: 'test1'],
      [kind: :Field, loc: [], name: 'test2']
    ]
    normalized = GraphQlAst.Debug.normalize_debug graphql

    assert normalized == [[kind: :Field, name: "test1"], [kind: :Field, name: "test2"]]
  end
end
