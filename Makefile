.PHONY: docs docserve docbuild

docs: docserve

docserve:
	mkdocs serve --livereload

docbuild:
	mkdocs build
