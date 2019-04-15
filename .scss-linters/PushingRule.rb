module SCSSLint
  # Checks for use of margin/padding bottom/left and warns against their use. Check Philosophies section of guides for more info.
  class Linter::PushingRule < Linter
    include LinterRegistry

    def visit_prop(prop)
      check_push(prop)
    end

  private

    def check_push(node)
      selector = node.name
      props = ['margin-bottom', 'margin-right', 'padding-bottom', 'padding-right']

      if props.include? selector[0]
        add_lint(node, "Recommend using margin/padding-top/left instead. Elements should push themselves rather than being pushed. See Guides for more info.")
      end
    end
  end
end
