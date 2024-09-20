from app import create_app  

def main():
    app = create_app()  

    if len(sys.argv) > 1 and sys.argv[1] == 'run':  
        app.run(debug=True)  
    else:
        print("Usage: python app.py run")  

if __name__ == '__main__':
    import sys  
    main()
