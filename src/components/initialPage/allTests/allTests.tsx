import React, { useRef } from 'react';
import styles from './allTests.module.scss';
import { useTranslation } from 'react-i18next';
import { Test } from '../../../interfaces/test';

interface AllTestsProps {
  tests?: Test[];
}

const AllTests: React.FC<AllTestsProps> = ({ tests = [] }) => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.allTestsSec}>
      <div className={styles.allTestsContainer}>
        <h2 className={styles.testsTitle}>{t('common:availableTests')}</h2>

        {tests.length === 0 ? (
          <p className={styles.noTestsMessage}>{t('addTest:noTests')}</p>
        ) : (
          <div className={styles.carouselControls}>
            <button
              className={styles.carouselButton}
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              &#8249;
            </button>

            <div className={styles.testsRow} ref={scrollRef}>
              {tests.map((test) => (
                <div key={test.id} className={styles.testCard}>
                  <img
                    className={styles.testImage}
                    src={test.imageUrl}
                    alt={test.title}
                  />
                  <div className={styles.cardBody}>
                    <h3 className={styles.testTitle}>{test.title}</h3>
                    <p className={styles.testDescription}>{test.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={styles.carouselButton}
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              &#8250;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllTests;
