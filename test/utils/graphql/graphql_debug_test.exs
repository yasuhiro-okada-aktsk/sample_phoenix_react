defmodule SamplePhoenixReactApp.GraphQl.DebugTest do
  use ExUnit.Case, async: true

  alias SamplePhoenixReactApp.GraphQl

  test "normalize_debug" do
    graphql = [
      [kind: :Field, loc: [], name: 'test1'],
      [kind: :Field, loc: [], name: 'test2']
    ]
    normalized = GraphQl.Debug.normalize_debug graphql

    assert normalized == [[kind: :Field, name: "test1"], [kind: :Field, name: "test2"]]
  end
end
