defmodule SamplePhoenixReactApp.GraphQlAst.DebugTest do
  use ExUnit.Case, async: true

  alias SamplePhoenixReactApp.GraphQlAst

  test "clean" do
    graphql = [
      [kind: :Field, loc: [], name: 'test1'],
      [kind: :Field, loc: [], name: 'test2']
    ]
    cleaned = GraphQlAst.Clean.clean graphql

    assert cleaned == [[kind: :Field, name: "test1"], [kind: :Field, name: "test2"]]
  end
end
