import { useState } from 'react';
import short from 'short-uuid';
import { scrapUrl } from '../lib/api';
import { scrap } from '../store/board/actions';
import useRequest from './useRequest';

export default function useScrap() {
  const [typing, setTyping] = useState(false);
  const [scraping, setScraping] = useState(false);
  const { request } = useRequest();

  const onBlur = (e: FocusEvent) => {
    let element;
    if (e.relatedTarget) {
      (e.relatedTarget as HTMLElement).childNodes.forEach((child) => {
        if (child.textContent === 'ADD') {
          element = child;
        }
      });
    }
    if (!element) {
      setTyping(false);
    }
  };

  const onScrap = async (
    code: string,
    listId: string,
    url: string | undefined
  ) => {
    if (url) {
      const card = {
        id: short().new(),
        attachedTo: listId,
        url,
      };
      setScraping(true);

      request({
        callback: () => scrapUrl(code, card),
      }).then(({ dispatch, response }) => {
        dispatch(
          scrap({
            ...card,
            data: response,
          })
        );
        setScraping(false);
      });
    }
  };

  const onReset = () => {
    setTyping(false);
  };

  return {
    typing,
    scraping,
    onBlur,
    onScrap,
    onReset,
  };
}
