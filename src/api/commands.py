import click
from api.models import db, User

def setup_commands(app):

    @app.cli.command("insert-test-users")
    @click.argument("count", type=int)
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, count + 1):
            user = User(email=f"test_user{x}@test.com")
            user.set_password("123456")
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print(f"User: {user.email} created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        # Implement this function as needed
        pass
