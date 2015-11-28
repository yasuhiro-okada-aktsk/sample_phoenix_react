defmodule SamplePhoenixReactApp.GraphQlAst.UtilsTest do
  use ExUnit.Case, async: true

  alias SamplePhoenixReactApp.GraphQlAst.Utils

  test "kind_clean" do
    actual = [kind: :Field, loc: [], name: 'test1']
    |> Utils.kind_clean

    assert actual == [kind: :Field, name: "test1"]
  end
end
