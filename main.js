$(document).ready(function() {
    // Load all posts on page load
    loadPosts();

    // Create Post
    $('#createPostForm').submit(function(e) {
        e.preventDefault();

        const title = $('#title').val();
        const content = $('#content').val();

        $.ajax({
            url: 'create_post.php',
            type: 'POST',
            data: { title: title, content: content },
            dataType: 'json',
            success: function(response) {
                alert(response.message);
                if (response.status === 'success') {
                    $('#title').val('');
                    $('#content').val('');
                    loadPosts();
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });

    // Load all posts
    function loadPosts() {
        $.ajax({
            url: 'view_posts.php',
            type: 'GET',
            dataType: 'json',
            success: function(posts) {
                $('#postsContainer').empty();
                posts.forEach(function(post) {
                    $('#postsContainer').append(`
                        <div class="post">
                            <div class="post-title">${post.title}</div>
                            <div class="post-content">${post.content}</div>
                            <div class="post-date">${post.created_at}</div>
                            <button class="delete-btn" data-id="${post.id}">Delete</button>
                        </div>
                    `);
                });

                // Attach click event for delete buttons
                $('.delete-btn').click(function() {
                    const postId = $(this).data('id');
                    if (confirm('Are you sure you want to delete this post?')) {
                        deletePost(postId);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }

    // Delete Post
    function deletePost(postId) {
        $.ajax({
            url: 'delete_post.php',
            type: 'POST',
            data: { id: postId },
            dataType: 'json',
            success: function(response) {
                alert(response.message);
                if (response.status === 'success') {
                    loadPosts();
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }
});
