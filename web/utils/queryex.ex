defmodule SamplePhoenixReactApp.QueryEx do
  defmacro select(query, cols) do
    Ecto.Query.Builder.Select.build(query, [{:f, [], nil}], make_select(cols), __CALLER__)
  end

  defp make_select(cols) do
    {:%{}, [], make_col([], cols)}
  end

  defp make_col(cols, [col|tl]) do
    cols = Keyword.put(cols, String.to_atom(col), {{:., [], [{:f, [], nil}, String.to_atom(col)]}, [], []})
    make_col(cols, tl)
  end

  defp make_col(cols, []) do
    cols
  end
end
