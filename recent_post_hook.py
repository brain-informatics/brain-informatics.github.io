def on_page_context(context, page, config, nav):
    if page.meta.get("template") != "home.html": return

    all_posts = config["plugins"]["material/blog"].blog.posts

    if config.extra.get("filter_preprint"):
        all_posts = [
            post for post in all_posts
            if not any(category.title == "Preprint" for category in post.categories)
        ]

    latest_posts = sorted(
        all_posts, key=lambda post: post.config.date.created, reverse=True
    )
    context["posts"] = latest_posts[:5]
    return context