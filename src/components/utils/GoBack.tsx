function GoBack(): JSX.Element {
    
    const goBack = () => {
        window.history.back();
    }

    return (
        <button className='go-back' type='button' onClick={goBack}>Go Back</button>
    )
}

export default GoBack;
