defmodule QueryEx do
  defmacro select(query, cols) do
    quote do
      Ecto.Query.Builder.Select.build(unquote(query), [{:f, [], nil}], QueryEx.make_select(unquote(cols)), __ENV__)
      |> Code.eval_quoted
      |> elem(0)
    end
  end

  def make_select(cols) do
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
