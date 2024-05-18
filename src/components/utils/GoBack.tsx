function GoBack({deleted = false} : {deleted?: boolean}): JSX.Element {
    
    const goBack = () => {
        if (deleted) {
            window.location.href = '/';
        } else {
        window.history.back();
      }
    }

    return (
        <button className='go-back' type='button' onClick={goBack}>Go Back</button>
    )
}

export default GoBack;
